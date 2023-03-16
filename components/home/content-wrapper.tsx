import React, {ReactNode} from "react";

type Props = {
    children?: ReactNode
}

const ContentWrapper = ({ children }: Props) => {

    return (
        <section className={"relative py-16 bg-blueGray-200"}>
            {children}
        </section>
    )
}

export default ContentWrapper