import styled from "styled-components"
import EstilosGlobais from "./Componentes/EstilosGlobais"
import Cabecalho from "./Componentes/Cabecalho"
import BarraLateral from "./Componentes/BarraLateral"
import Banner from "./Componentes/Banner"
import bannerBackground from './assets/banner.png'
import Galeria from "./Componentes/Galeria"
import fotos from './fotos.json'
import { useEffect, useState } from "react"
import ModalZoom from "./Componentes/ModalZoom"
import Rodape from './Componentes/Rodape'

const FundoGradiente = styled.div`
  background: var(--Gradiente-fundo, linear-gradient(175deg, #041833 4.16%, #04244F 48%, #154580 96.76%));
  width: 100%;
  min-height: 100vh;
`
const AppContainer = styled.div`
  width: 1440px;
  margin: 0 auto;
  max-width: 100%;
`
const MainContainer = styled.main`
  display: flex;
  gap: 24px;
`

const ConteudoGaleria = styled.section`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`

const App = () => {
  const [fotosDaGaleria, setFotosDaGaleria] = useState(fotos)
  const [filtro, setFiltro] = useState('')
  const [tag, setTag] = useState(0)
  const [fotoSelecionada, setFotoSelecionada] = useState(null)

  useEffect(() => {
    const fotosFiltradas = fotos.filter(foto => {
      const filtroPorTag = !tag || foto.tagId === tag;
      const filtroPorTitulo = !filtro || foto.titulo.toLocaleLowerCase().includes(filtro.toLowerCase())
      return filtroPorTag && filtroPorTitulo
    })
    setFotosDaGaleria(fotosFiltradas)
  }, [filtro, tag])

  const aoAlternarFavorito = (foto) => {
    if (foto.id === fotoSelecionada?.id) {
      setFotoSelecionada({
        ...fotoSelecionada,
        favorita: !fotoSelecionada.favorita
      })
    }

    setFotosDaGaleria(fotosDaGaleria.map(fotoDaGaleria => {
      return {
        ...fotoDaGaleria,
        favorita: fotoDaGaleria.id === foto.id ? !foto.favorita : fotoDaGaleria.favorita
      }
    }))
  }

  return (
    <FundoGradiente>
      <EstilosGlobais />
      <AppContainer>
        <Cabecalho
          filtro={filtro}
          setFiltro={setFiltro}
        />
        <MainContainer>
          <BarraLateral />
          <ConteudoGaleria>
            <Banner
              texto="A galeria mais completa de fotos do espaço!"
              backgroundImage={bannerBackground}
            />
            <Galeria
              aoFotoSelecionada={foto => setFotoSelecionada(foto)}
              aoAlternarFavorito={aoAlternarFavorito}
              fotos={fotosDaGaleria}
              setTag={setTag}
            />
          </ConteudoGaleria>
        </MainContainer>
      </AppContainer>
      <Rodape />
      <ModalZoom
        foto={fotoSelecionada}
        aoFechar={() => setFotoSelecionada(null)}
        aoAlternarFavorito={aoAlternarFavorito}
      />
    </FundoGradiente>
  )
}

export default App