import argon2 from "argon2";

export const encryptPassword = async (rawPassword: string) => {
	const encrypted = await argon2.hash(rawPassword);

	return encrypted;
};

export const verifyPassword = async (rawPassword: string, encryptedPassword: string) => {
	const isMatched = await argon2.verify(encryptedPassword, rawPassword);

	return isMatched;
};
