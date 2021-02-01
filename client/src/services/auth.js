// import { response } from "express";

export const authenticate = async () => {
  const res = await fetch("/api/users/auth", {
    credentials: "include",
  });
  // const json = await res.json();
  console.log(res);
  if (res.status === 401) {
    return false;
  } else if (res.status === 200) {
    const parsed = await res.json();
    return parsed.user;
  }
};

export const login = async (username, password) => {
  try {
    const res = await fetch("/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    return await res.json();
  } catch (e) {
    console.log(e);
  }
};

export const logout = async () => {
  try {
    const res = await fetch("/api/users/logout", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    return await res.json();
  } catch (e) {
    console.log(e);
  }
};

export const signUp = async (username, email, password) => {
  const res = await fetch("/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });

  return await res.json();
};
