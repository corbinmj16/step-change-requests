import {supabase} from "./supabase";
export const formatDate = (date) => {
  if (!date) return '';

  return new Date(date).toLocaleDateString('en-us',{ weekday:"long", year:"numeric", month:"short", day:"numeric"});
}

export const getUser = async (req) => {
    const refreshToken = req.cookies['my-refresh-token']
    const accessToken = req.cookies['my-access-token']

    if (refreshToken && accessToken) {
      await supabase.auth.setSession({
        refresh_token: refreshToken,
        access_token: accessToken,
      })
    } else {
      // make sure you handle this case!
      return false;
    }

    // returns user information
    const {data, error} = await supabase.auth.getUser();

    return data.user;
}

export const urlHasQuery = (param, query) => {
  if (!query) throw new Error(`query was not provided.`);

  if (!param) return false;

  if (param in query) return true;

  return false;
}