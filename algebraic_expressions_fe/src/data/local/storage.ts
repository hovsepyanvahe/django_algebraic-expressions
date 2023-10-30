
export type LocalDataKeys = "token" | "user";

export const writeData = async <T extends { [key: string]: any }>(key: LocalDataKeys, data: T) => {
  await localStorage.setItem(key, JSON.stringify(data));
};

export const readData = async <T>(key: LocalDataKeys): Promise<T | null> => {
  const dataString = await localStorage.getItem(key);
  if (dataString) {
    return JSON.parse(dataString);
  }
  return null;
};



export const deleteData = async (key: LocalDataKeys) => {
  await localStorage.removeItem(key);
};
