export default async function getTokenAndRoles(user, func) {
    try {
        const token = await func();
        const namespace = 'user';
        const roles = user[`${namespace}/roles`] || [];
        return { token, roles };
    } catch (e) {
        console.error(e);
    }
}