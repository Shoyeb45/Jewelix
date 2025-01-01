export const DB_NAME = "jewelleryDB";
export const cookieOptions = {
    httpOnly: true, // Prevent access via JavaScript
    secure: false, // Disable secure for local testing
    sameSite: 'None', // Allow same-site requests
    path: "/",
};