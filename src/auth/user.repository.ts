import { Repository, EntityRepository } from "typeorm";
import { ConflictException } from "@nestjs/common";
import * as  bcrypt from 'bcrypt';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { username, password } = authCredentialsDto;

        const exists = await this.findOne({ username });

        if(exists)
            throw new ConflictException("User already exists");
        
        const user = new User();
        user.username = username;
        user.salt = await bcrypt.genSalt()
        user.password = await this.hashPassword(password, user.salt);

        await user.save();
    }

    async validateUserPassword(authCredentialsDto: AuthCredentialsDto): Promise<string> {
        const { username, password } = authCredentialsDto;
        const user = await this.findOne({ username });

        const hash = await bcrypt.hash(password, user.salt);
        const isPasswordCorrect = hash === user.password;

        if(user && isPasswordCorrect)
            return user.username
        
        return null;
    }

    private async hashPassword(password: string, salt: string): Promise<string> {
        return await bcrypt.hash(password, salt);
    }
}