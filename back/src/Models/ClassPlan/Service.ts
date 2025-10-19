import { supabase } from "../../lib/supabaseClient.js";
import { processGeminiPrompt } from "../../lib/geminiProcessing.js";


export class service {

  async createLesson(tema_aula: string, ano_escolar: string, duracao_aula: string, disciplina: string, user_email: string) {

    const planoJSON = await processGeminiPrompt(tema_aula, ano_escolar, duracao_aula, disciplina);
    
    const {
      introducao_ludica,
      objetivo_bncc,
      passo_a_passo,
      rubrica_avaliacao
    } =  planoJSON

    // Inserção no Supabase
    console.log("Inserindo dados no Supabase...");
    const { data, error } = await supabase
      .from("planos_de_aula")
      .insert([{
        tema_aula,
        ano_escolar,
        duracao_aula,
        disciplina,
        introducao_ludica,
        objetivo_bncc,
        passo_a_passo,
        rubrica_avaliacao,
        plano_completo_json: planoJSON
      }])
      .select();

    if (error) {
      console.error("Erro ao inserir no Supabase:", error.message);
      throw new Error(error.message);
    }

    const LessonId = data[0].id;

    console.log("Associando plano de aula ao usuário...");
    const { data: associationData, error: associationError } =
      await supabase
        .from("user_class_plans")
        .insert([{
          user_email: user_email,
          class_plan_id: LessonId
        }])
        .select();

    console.log("Plano de aula criado com sucesso:");
    return data;
  }

  async listLessons(user_email: string) {
  // 1️⃣ Busca todos os relacionamentos do usuário
  const { data: userPlans, error: relError } = await supabase
    .from("user_class_plans")
    .select("class_plan_id")
    .eq("user_email", user_email);

  if (relError) {
    console.error("Erro ao buscar planos do usuário:", relError.message);
    throw new Error(relError.message);
  }

  // 2️⃣ Extrai os IDs dos planos
  const planIds = userPlans.map((p) => p.class_plan_id);

  // 3️⃣ Busca os planos correspondentes
  const { data: planos, error: planosError } = await supabase
    .from("planos_de_aula")
    .select("*")
    .in("id", planIds);

    console.log("Planos de aula encontrados:", planos);

  if (planosError) {
    console.error("Erro ao buscar planos de aula:", planosError.message);
    throw new Error(planosError.message);
  }

  return planos;
}
}
