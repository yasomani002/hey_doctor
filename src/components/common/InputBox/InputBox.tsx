import Text from "../Text"

interface Props {
    label: string
    children: React.ReactNode
    error?: string
}

const InputBox = ({ label, children, error }: Props) => {
    return (
        <div>
            <label>{label}</label>
            {children}
            {error && <Text className="text-red-500">{error}</Text>}
        </div>
    )
}

export default InputBox