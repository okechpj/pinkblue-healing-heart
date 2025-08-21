import Header from "@/components/Header";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-8">
        <section className="py-20 px-4 bg-gradient-soft">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-6 animate-gentle-fade">
              About{" "}
              <span className="bg-gradient-healing bg-clip-text text-blue-950 rounded-2xl p-2">
                PinkBlue
              </span>
            </h1>
            <p className="text-xl text-warm-gray animate-gentle-fade">
              Our story of transformation from Pink Ribbon Drive to a movement of healing and hope.
            </p>
          </div>
        </section>
        
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="prose prose-lg max-w-none">
              <h2 className="font-heading text-3xl font-bold text-foreground mb-6">My Story</h2>
              <p className="text-warm-gray leading-relaxed mb-6">
                PinkBlue began as a heartfelt response to witnessing the courage of those facing cancer. 
                What started as the Pink Ribbon Drive has blossomed into something much greater—a movement 
                that embraces not just the color of awareness, but the full spectrum of healing.
              </p>
              <p className="text-warm-gray leading-relaxed mb-8">
                The addition of blue represents peace, tranquility, and the calm strength needed during 
                life's most challenging moments. Together, pink and blue create a harmony that speaks 
                to both the warrior spirit and the gentle healing required on this journey.
              </p>
              
              <h2 className="font-heading text-3xl font-bold text-foreground mb-6">Our Mission & Vision</h2>
              <div className="bg-gradient-healing rounded-2xl p-8 text-white mb-8">
                <h3 className="font-heading text-2xl font-bold mb-4">Mission</h3>
                <p className="mb-6 opacity-90">
                  To provide compassionate support, natural wellness products, and community connection 
                  for cancer patients, survivors, and their families through our holistic approach to healing.
                </p>
                
                <h3 className="font-heading text-2xl font-bold mb-4">Vision</h3>
                <p className="opacity-90">
                  A world where no one faces cancer alone, where healing is supported by love, 
                  community, and access to natural wellness resources that nurture both body and spirit.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;