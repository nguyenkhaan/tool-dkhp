//File dung de khai bao cac ham tracker nguoi dung 
import posthog from 'posthog-js'

class Tracker 
{
    static init() 
    {
        const api_key = process.env.NEXT_POSTHOG_API as string 
        const host = process.env.NEXT_POSTHOG_HOST as string 
        posthog.init(api_key, {
            api_host: host , 
            persistence: 'localStorage', 
            autocapture: false
        })
    } 
    static login(id : string , property : Record<string , any>) 
    {
        posthog.identify(id , property)
    } 
    static getIdentity() 
    {
        return posthog.get_distinct_id() 
    }
    static registerValue(property : Record<string , any>) 
    {
        posthog.register(property) 
    } 
    static getProperty(name : string) 
    {
        return posthog.get_property(name) 
    }
    static logout() 
    {
        posthog.reset() 
    }
    static save(key : string , data : any) {
        localStorage.setItem(key , JSON.stringify(data))   //Luu du lieu vao localStorage 
    } 
    static get(key : string) {
        const data = localStorage.getItem(key) 
        if (typeof data == 'string') 
            return JSON.parse(data) 
        return null //Khong thi tra ve khong co du lieu 
    }
}   
export default Tracker 