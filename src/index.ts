import {sign} from "./jwt/sign";
import {verify} from "./jwt/verify";

const token = sign({
  exp: Date.now() + 24 * 60 * 60 * 1000,
  data: {
    sub: "@gabriel123",
    roles: ["admin", "user"],
  },
  secret: "say_my_name",
});

const decoded = verify({token, secret: "say_my_name"});
console.log({decoded});
