const bcrypt = require('bcrypt');

const Auth = require('../middlewares/auth');
const UserModel = require('../models/user');
const ErrorTypes = require('../helpers/ErrorTypes');
const Response = require('../helpers/Response');
const TokenGenerator = require('../helpers/TokenGenerator');

class UserService {
  static async post(body) {
    try {
      // Check required fields
      if (!body.name || !body.email || !body.password) {
        return new Response(null, ErrorTypes.U003);
      }
      
      // Check if e-mail already exists
      const emailExistent = await UserModel.getByEmail(body.email);
      if (emailExistent) {
        return new Response(null, ErrorTypes.U001);
      }

      // Add new user
      const salt = await bcrypt.genSalt(10);
      body.password = await bcrypt.hashSync(body.password, salt);
      body.admin = false;
      const user = await UserModel.add(body);

      if (user) {
        user.password = null;
        return new Response(user);
      }
      return new Response(null, ErrorTypes.G000);
    } catch (error) {
      throw error;
    }
  }

  static async login(body) {
    try {
      // Check required fields
      if (!body.email || !body.password) {
        return new Response(null, ErrorTypes.U003);
      }
      
      // Check if e-mail exists
      const user = await UserModel.getByEmail(body.email);
      if (!user) {
        return new Response(null, ErrorTypes.U004);
      }

      // Check if user is active
      if (!user.active) {
        return new Response(null, ErrorTypes.U006);
      }

      // Check password
      const successfull = await bcrypt.compare(body.password, user.password);
      if (successfull) {
        const token = Auth.createToken({ _id: user._id, name: user.name, email: user.email, admin: user.admin });
        return new Response({ token, consentTermAcceptedAt: user.consentTermAcceptedAt });
      }

      return new Response(null, ErrorTypes.U004);
    } catch (error) {
      throw error;
    }
  }

  static async loginRefresh(req) {
    try {
      const tokenDecoded = Auth.getToken(req);
      const user = await UserModel.getById(tokenDecoded._id);
      if (user && user.active) {
        const token = Auth.createToken({
          _id: user._id,
          name: user.name,
          email: user.email,
          admin: user.admin,
        });
        return new Response({ token, consentTermAcceptedAt: user.consentTermAcceptedAt });
      } else {
        return new Response(null, ErrorTypes.U006);
      }
    } catch (error) {
      throw error;
    }
  }

  static async get(id) {
    try {
      // Check required fields
      if (!id) {
        return new Response(null, ErrorTypes.U005);
      }
      
      // Get the user
      const user = await UserModel.getById(id);
      if (user) {
        return new Response(user);
      }
      return new Response(null, ErrorTypes.U005);
    } catch (error) {
      throw error;
    }
  }
  
  static async acceptConsentTerm(id) {
    try {
      // Check required fields
      if (!id) {
        return new Response(null, ErrorTypes.U005);
      }
      
      // Get the user
      const user = await UserModel.getById(id);
      if (user) {
        user.consentTermAcceptedAt = new Date();
        await UserModel.put(user);
        return new Response(true);
      }
      return new Response(null, ErrorTypes.U005);
    } catch (error) {
      throw error;
    }
  }

  static async getConsentTerm(id) {
    try {
      // Check required fields
      if (!id) {
        return new Response(null, ErrorTypes.U005);
      }
      
      // Get the user
      const user = await UserModel.getById(id);
      if (user) {
        const ConsentTerm = require('../helpers/ConsentTerm');
        return new Response(ConsentTerm.replace('{name}', user.name));
      }
      return new Response(null, ErrorTypes.U005);
    } catch (error) {
      throw error;
    }
  }

  static async passwordRecoverToken(email) {
    try {
      // Check required fields
      if (!email) {
        return new Response(null, ErrorTypes.U005);
      }
      
      // Get the user
      const user = await UserModel.getByEmail(email);
      if (user) {
        const minutes = 20;
        user.token = TokenGenerator();
        user.tokenExpiresAt = new Date(new Date().getTime() + minutes*60000);
        await UserModel.put(user);
        return new Response(true);
      }
      return new Response(null, ErrorTypes.U005);
    } catch (error) {
      throw error;
    }
  }

  static async passwordRecoverTokenCheck(email, token) {
    try {
      // Check required fields
      if (!email) {
        return new Response(null, ErrorTypes.U005);
      }
      
      // Get the user
      const user = await UserModel.getByEmail(email);
      if (user) {
        if (user.tokenExpiresAt && user.tokenExpiresAt < new Date()) {
          return new Response(null, ErrorTypes.U007);
        } else if (user.token !== token) {
          return new Response(null, ErrorTypes.U008);
        } else {
          return new Response(true);
        }
      }
      return new Response(null, ErrorTypes.U005);
    } catch (error) {
      throw error;
    }
  }

  static async updatePassword(email, token, password, passwordConfirm) {
    try {
      // Check required fields
      if (!email) {
        return new Response(null, ErrorTypes.U005);
      }
      
      // Get the user
      const user = await UserModel.getByEmail(email);
      if (user) {
        if (user.tokenExpiresAt && user.tokenExpiresAt < new Date()) {
          return new Response(null, ErrorTypes.U007);
        } else if (user.token && user.token !== token) {
          return new Response(null, ErrorTypes.U008);
        } else {
          if (password !== passwordConfirm) {
            return new Response(null, ErrorTypes.U010);
          } else if (typeof password === 'string' && password.length > 0) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hashSync(password, salt);
            await UserModel.put(user);
            return new Response(true);
          } else {
            return new Response(null, ErrorTypes.U009);
          }
        }
      }
      return new Response(null, ErrorTypes.U005);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserService;
