import { useState, useEffect } from 'react';
import { BookOpen, Clock, GraduationCap, BookMarked } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';


interface Plan {
  id: string,
  tema_aula: string,
  disciplina: string,
  duracao_aula: string,
  ano_escolar: string,
  plano_completo_json: planoCompleto
}

  interface planoCompleto{
    objetivo_bncc: string,
    introducao_ludica: string[],
    passo_a_passo: string,
    rubrica_avaliacao: string
  }

const MyPlans = () => {
  const [mockPlans, setMockPlans] = useState<Plan[]>([])
  const [selectedPlan, setSelectedPlan] = useState<typeof mockPlans[0] | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const user = useAuth();

  const fetchPlans = async () => {
    try {
      const result = await fetch(`http://localhost:3000/classPlan/${user.user.email}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!result.ok) {
        throw new Error('Failed to fetch plans');
      }
      const data = await result.json();

      setMockPlans(data.planos_de_aula);
    } catch (error) {
      toast.error('Erro ao buscar planos de aula.');
    }
  }

  useEffect(() => {
    fetchPlans();
  }, []);

  const handleViewPlan = (plan: typeof mockPlans[0]) => {
    setSelectedPlan(plan);
    setIsDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Meus Planos de Aula</h1>
          <p className="text-muted-foreground">
            Gerencie todos os seus planos de aula em um só lugar
          </p>
        </div>

        {mockPlans.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <BookOpen className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <p className="text-lg text-muted-foreground mb-4">
                Você ainda não criou nenhum plano de aula
              </p>
              <Button className="bg-gradient-primary">
                Criar Primeiro Plano
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockPlans.map((plan) => (
              <Card
                key={plan.id}
                className="hover:shadow-lg transition-all cursor-pointer"
                onClick={() => handleViewPlan(plan)}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookMarked className="h-5 w-5 text-primary" />
                    {plan.tema_aula}
                  </CardTitle>
                  <CardDescription>{plan.disciplina}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {plan.duracao_aula}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <GraduationCap className="h-4 w-4" />
                      {plan.ano_escolar}
                    </div>
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    Ver Plano Completo
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl">{selectedPlan?.tema_aula}</DialogTitle>
              <DialogDescription>
                {selectedPlan?.disciplina} • {selectedPlan?.duracao_aula} • {selectedPlan?.ano_escolar}
              </DialogDescription>
            </DialogHeader>
            {selectedPlan && (
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Objetivo</h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedPlan.plano_completo_json.objetivo_bncc}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Materiais</h3>
                  
                    {selectedPlan.plano_completo_json.introducao_ludica
                    }
                  
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Metodologia</h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedPlan.plano_completo_json.passo_a_passo}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Avaliação</h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedPlan.plano_completo_json.rubrica_avaliacao}
                  </p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default MyPlans;
