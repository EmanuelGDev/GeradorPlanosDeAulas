import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Navbar from '@/components/Navbar';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

const CreatePlan = () => {
  const user = useAuth();
  const [tema, setTema] = useState('');
  const [anoEscolar, setAnoEscolar] = useState('');
  const [duracao, setDuracao] = useState('');
  const [disciplina, setDisciplina] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if(!tema || !anoEscolar || !duracao || !disciplina){
      toast.error('Por favor, preencha todos os campos obrigatórios.');
      setIsLoading(false);
      return;
    }

    try {
      const result = await fetch('http://localhost:3000/classPlan/criar-planos-de-aulas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          tema_aula : tema,
          ano_escolar : anoEscolar, 
          duracao_aula : duracao,
          disciplina :disciplina,
          user_email: user?.user?.email
        })
      })

      if(!result.ok){
        throw new Error('Creation failed');
      }

      setTema('');
      setAnoEscolar('');
      setDuracao('');
      setDisciplina('');

      toast.success('Plano de aula criado com sucesso!');

      navigate('/my-plans');
      
    } catch (error) {
      toast.error('Erro ao criar plano. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <Card className="max-w-2xl mx-auto shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl">Criar Novo Plano de Aula</CardTitle>
            <CardDescription>
              Preencha os campos abaixo para gerar um plano de aula personalizado
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="tema">Tema da Aula *</Label>
                <Input
                  id="tema"
                  placeholder="Ex: Fotossíntese, Revolução Francesa..."
                  value={tema}
                  onChange={(e) => setTema(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="anoEscolar">Ano Escolar *</Label>
                <Select value={anoEscolar} onValueChange={setAnoEscolar} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o ano escolar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1º Ano Ensino Fundamental">1º Ano Ensino Fundamental</SelectItem>
                    <SelectItem value="2º Ano Ensino Fundamental">2º Ano</SelectItem>
                    <SelectItem value="3º Ano Ensino Fundamental">3º Ano</SelectItem>
                    <SelectItem value="4º Ano Ensino Fundamental">4º Ano</SelectItem>
                    <SelectItem value="5º Ano Ensino Fundamental">5º Ano</SelectItem>
                    <SelectItem value="6º Ano Ensino Fundamental">6º Ano</SelectItem>
                    <SelectItem value="7º Ano Ensino Fundamental">7º Ano</SelectItem>
                    <SelectItem value="8º Ano Ensino Fundamental">8º Ano</SelectItem>
                    <SelectItem value="9º Ano Ensino Fundamental">9º Ano</SelectItem>
                    <SelectItem value="1º Ano Ensino Médio">1º Ano Ensino Médio</SelectItem>
                    <SelectItem value="2º Ano Ensino Médio">2º Ano Ensino Médio</SelectItem>
                    <SelectItem value="3º Ano Ensino Médio">3º Ano Ensino Médio</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="duracao">Duração da Aula *</Label>
                <Select value={duracao} onValueChange={setDuracao} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a duração" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30 minutos">30 minutos</SelectItem>
                    <SelectItem value="45 minutos">45 minutos</SelectItem>
                    <SelectItem value="50 minutos">50 minutos</SelectItem>
                    <SelectItem value="60 minutos">60 minutos</SelectItem>
                    <SelectItem value="90 minutos">90 minutos</SelectItem>
                    <SelectItem value="120 minutos">120 minutos</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="disciplina">Disciplina *</Label>
                <Select value={disciplina} onValueChange={setDisciplina} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a disciplina" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="portugues">Português</SelectItem>
                    <SelectItem value="matematica">Matemática</SelectItem>
                    <SelectItem value="ciencias">Ciências</SelectItem>
                    <SelectItem value="historia">História</SelectItem>
                    <SelectItem value="geografia">Geografia</SelectItem>
                    <SelectItem value="ingles">Inglês</SelectItem>
                    <SelectItem value="artes">Artes</SelectItem>
                    <SelectItem value="educacao-fisica">Educação Física</SelectItem>
                    <SelectItem value="fisica">Física</SelectItem>
                    <SelectItem value="quimica">Química</SelectItem>
                    <SelectItem value="biologia">Biologia</SelectItem>
                    <SelectItem value="filosofia">Filosofia</SelectItem>
                    <SelectItem value="sociologia">Sociologia</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/')}
                  className="flex-1"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-primary hover:opacity-90"
                  disabled={isLoading}
                >
                  {isLoading ? 'Gerando...' : 'Gerar Plano'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreatePlan;
