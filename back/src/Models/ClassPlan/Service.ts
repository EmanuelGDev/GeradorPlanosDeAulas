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
      throw new Error(error.message);
    }

    const LessonId = data[0].id;

    const { data: associationData, error: associationError } =
      await supabase
        .from("user_class_plans")
        .insert([{
          user_email: user_email,
          class_plan_id: LessonId
        }])
        .select();

    return data;
  }

  async listLessons(user_email: string) {
  const { data: userPlans, error: relError } = await supabase
    .from("user_class_plans")
    .select("class_plan_id")
    .eq("user_email", user_email);

  if (relError) {
    throw new Error(relError.message);
  }

  const planIds = userPlans.map((p) => p.class_plan_id);

  const { data: planos, error: planosError } = await supabase
    .from("planos_de_aula")
    .select("*")
    .in("id", planIds);

  if (planosError) {
    throw new Error(planosError.message);
  }

  return planos;
}
}
