import { colors } from "@/styles/colors"
import Text from "../Text"

interface Props {
    required?: boolean
    label: string
    children: React.ReactNode
    error?: string
}

const InputBox = ({ label, children, error, required }: Props) => {
    return (
        <div>
            <label>{label} {required && <span className="text-red-500">*</span>}</label>
            {children}
            {error && <Text fontSize="10px" color={colors.text.rejected} className="mt-1">{error}</Text>}
        </div>
    )
}

export default InputBox