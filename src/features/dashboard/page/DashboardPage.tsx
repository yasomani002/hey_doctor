import Header from "@/components/common/Header/Header"

const DashbaordPage = () => {
    return (
        <>
            <Header
                currentPage=""
                mainPage="Dashboard"
                mainPageLink="/dashboard"
                showHome={true}
                middlePages={[]}
            />
        </>
    )
}

export default DashbaordPage