import { Avatar as _Avatar, type AvatarProps } from "./Avatar";
import { AvatarGroup, type AvatarGroupProps } from "./AvatarGroup";

type AvatarCollection = typeof _Avatar & {
    Group: typeof AvatarGroup;
  };
  
const Avatar = _Avatar as AvatarCollection;  
Avatar.Group = AvatarGroup;

export {
    type AvatarProps,
    type AvatarGroupProps
  };
  
  export default Avatar;