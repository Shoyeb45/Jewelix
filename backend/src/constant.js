export const DB_NAME = "jewelleryDB";
export const cookieOptions = {
    httpOnly: true, // Prevent access via JavaScript
    secure: false, // Disable secure for local testing
    sameSite: 'None', // Allow same-site requests
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie expiry: 7 days
};