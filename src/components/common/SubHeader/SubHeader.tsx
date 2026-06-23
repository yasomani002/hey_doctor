import { SubHeaderContainer } from "./SubHeaderStyle";

interface Props {
    children?: React.ReactNode;
}

const SubHeader = ({ children }: Props) => {
    return (
        <SubHeaderContainer>
            {children}
        </SubHeaderContainer>
    )
}

export default SubHeader