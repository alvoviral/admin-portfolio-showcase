
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import StarBackground from "../components/StarBackground";

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <StarBackground />
      <Navbar />
      
      <main className="flex-grow py-16 px-6 md:px-12">
        <div className="container mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-nexplay-gold">Sobre Nós</h1>
          <p className="text-gray-300 mb-12 max-w-3xl">
            A Nexplay IA é uma empresa pioneira em soluções de inteligência artificial para transformação digital.
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Nossa Missão</h2>
              <p className="text-gray-300 mb-6">
                Nossa missão é democratizar o acesso à inteligência artificial e oferecer soluções inovadoras que impulsionem a transformação digital das empresas, independentemente de seu tamanho ou setor.
              </p>
              <p className="text-gray-300">
                Acreditamos que a IA tem o poder de transformar processos, aumentar a eficiência e criar novas oportunidades de negócio. Por isso, trabalhamos incansavelmente para desenvolver tecnologias que sejam acessíveis, escaláveis e que gerem resultados reais.
              </p>
            </div>
            <div className="bg-nexplay-card border border-gray-800 rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1639322537504-6427a16b0a28?q=80&w=1632&auto=format&fit=crop" 
                alt="Equipe Nexplay IA" 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">Equipe Especializada</h3>
                <p className="text-gray-300">
                  Nossa equipe é formada por especialistas em IA, cientistas de dados, desenvolvedores e consultores de negócios que trabalham em conjunto para entregar soluções personalizadas e de alto impacto.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6">Nossa Abordagem</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-nexplay-card p-6 rounded-lg border border-gray-800">
                <div className="w-12 h-12 bg-nexplay-gold/20 rounded-full flex items-center justify-center mb-4">
                  <span className="text-nexplay-gold text-2xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Entender</h3>
                <p className="text-gray-300">
                  Começamos entendendo profundamente os desafios e objetivos do seu negócio para identificar oportunidades de aplicação de IA.
                </p>
              </div>
              <div className="bg-nexplay-card p-6 rounded-lg border border-gray-800">
                <div className="w-12 h-12 bg-nexplay-gold/20 rounded-full flex items-center justify-center mb-4">
                  <span className="text-nexplay-gold text-2xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Desenvolver</h3>
                <p className="text-gray-300">
                  Desenvolvemos soluções personalizadas usando as mais avançadas tecnologias de IA, sempre com foco em escalabilidade e resultados.
                </p>
              </div>
              <div className="bg-nexplay-card p-6 rounded-lg border border-gray-800">
                <div className="w-12 h-12 bg-nexplay-gold/20 rounded-full flex items-center justify-center mb-4">
                  <span className="text-nexplay-gold text-2xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Transformar</h3>
                <p className="text-gray-300">
                  Implementamos e integramos as soluções ao seu negócio, garantindo que elas gerem valor e impulsionem sua transformação digital.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6">Nossos Diferenciais</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-start">
                <div className="mr-4 text-nexplay-gold">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Especialização em IA</h3>
                  <p className="text-gray-300">
                    Focamos exclusivamente em soluções baseadas em inteligência artificial, o que nos permite aprofundar nosso conhecimento e oferecer as tecnologias mais avançadas.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="mr-4 text-nexplay-gold">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Soluções Personalizadas</h3>
                  <p className="text-gray-300">
                    Desenvolvemos soluções sob medida para cada cliente, levando em consideração seus desafios específicos e objetivos de negócio.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="mr-4 text-nexplay-gold">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Resultados Mensuráveis</h3>
                  <p className="text-gray-300">
                    Nossas soluções são projetadas para gerar resultados tangíveis e mensuráveis, com foco em ROI e impacto nos negócios.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="mr-4 text-nexplay-gold">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Equipe Multidisciplinar</h3>
                  <p className="text-gray-300">
                    Contamos com uma equipe diversificada de especialistas que combina conhecimentos técnicos e de negócios para oferecer soluções completas.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutPage;
