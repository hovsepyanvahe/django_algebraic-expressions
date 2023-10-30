
export type SignInParams = {
  username: string;
  password: string;
};



export type SignInResponse = {
  token: string;
};



export type SignUpParams = {
  username: string;
  email: string;
  password: string;
};

export type SignUpResponse = {
  username: string;
  email: string;
};
