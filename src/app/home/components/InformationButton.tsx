import { Info } from "lucide-react"
const InformationButton = () => 
{
    return (
        <li className="w-full border flex items-center justify-start gap-3 rounded-md px-4 py-3 border-green-600">
            <Info size={24} color="green" strokeWidth={2} />
            <span className="font-semibold">Huong dan su dung</span>
        </li>
    )
}
export default InformationButton