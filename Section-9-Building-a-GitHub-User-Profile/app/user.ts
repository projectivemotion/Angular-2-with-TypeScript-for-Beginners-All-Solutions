/**
 * Project: Angular-2-with-TypeScript-for-Beginners-All-Solutions
 *
 * @author Amado Martinez <http://amadomartinez.mx>
 */
 export interface User {
    login: string;
    avatar_url?: string;
    followers?: User[];
}