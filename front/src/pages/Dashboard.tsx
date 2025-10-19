import { Link } from 'react-router-dom';
import { PlusCircle, BookOpen } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '@/components/Navbar';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Seus Planos de Aula
          </h1>
          <p className="text-lg text-muted-foreground">
            Crie e organize planos de aula de forma simples e eficiente
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <Link to="/create-plan">
            <Card className="hover:shadow-lg transition-all cursor-pointer border-2 hover:border-primary">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-primary rounded-lg p-3">
                    <PlusCircle className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <CardTitle>Gerar Novo Plano</CardTitle>
                    <CardDescription>
                      Crie um plano de aula personalizado
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Preencha informações como tema, disciplina e duração para gerar um plano completo
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/my-plans">
            <Card className="hover:shadow-lg transition-all cursor-pointer border-2 hover:border-accent">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-accent rounded-lg p-3">
                    <BookOpen className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <div>
                    <CardTitle>Meus Planos</CardTitle>
                    <CardDescription>
                      Acesse seus planos salvos
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Visualize, edite e gerencie todos os seus planos de aula em um só lugar
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
