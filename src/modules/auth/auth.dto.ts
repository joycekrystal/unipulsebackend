import { IsNotEmpty, IsEmail, IsString, IsOptional } from "class-validator";
import { type RequestOtpType } from "@/types";

export type AdminSigninCredentials = {
  email: string;
  password: string;
};

export type SigninCredentials = {
  studentId: string;
  password: string;
};

export type SignupData = {
  email: string;
  firstName: string;
  middleName?: string;
  lastName: string;
} & SigninCredentials;

export type RequestOtp = {
  type: RequestOtpType;
} & Pick<SignupData, "email">;

export class SigninCredentialsDTO implements SigninCredentials {
  @IsNotEmpty()
  @IsString()
  studentId: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class AdminSigninCredentialsDTO implements AdminSigninCredentials {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class SignupDataDTO extends SigninCredentialsDTO implements SignupData {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  middleName?: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;
}

export class RequestOtpDTO implements RequestOtp {
  @IsNotEmpty()
  @IsString()
  type: RequestOtpType;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
