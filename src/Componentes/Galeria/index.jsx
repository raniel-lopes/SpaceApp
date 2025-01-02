import styled from "styled-components"
import Titulo from "../Titulo"
import Tags from "./Tasgs"
import Populares from "./Populares"

const GaleriaConteiner = styled.div`
    display: flex;
`

const SecaoFluida = styled.section`
    flex-grow: 1;
`

const Galeria = () => {
    return (
        <>
            <Tags />
            <GaleriaConteiner>
                <SecaoFluida>
                    <Titulo>Navegue pela galeria</Titulo>
                </SecaoFluida>
                <Populares />
            </GaleriaConteiner>
        </>
    )
}

export default Galeria