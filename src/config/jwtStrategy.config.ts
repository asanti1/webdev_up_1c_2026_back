import passport from "passport";
import { Strategy as JwtStrategy } from "passport-jwt";
import { AppDataSource } from "../database";
import { User } from "../entity/user.entity";
import { jwtOptions } from "./jwt.config";

const userRepository = AppDataSource.getRepository(User);


passport.use(
    new JwtStrategy(jwtOptions, async (payload, done) => {
        try {
            const user = await userRepository.findOne({
                where: { id: payload.sub },
                relations: {
                    role: true,
                    country:true
                },
            });

            if (!user) {
                return done(null, false);
            }

            return done(null, user);

        } catch (error) {
            return done(error, false);
        }
    })
);