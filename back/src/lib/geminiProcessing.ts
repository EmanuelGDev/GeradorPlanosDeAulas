import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);


export interface LessonPlan {
  introducao_ludica: string;
  objetivo_bncc: any; 
  passo_a_passo: string;
  rubrica_avaliacao: string;
}

export async function processGeminiPrompt(
  tema_aula: string,
  ano_escolar: string,
  duracao_aula: string,
  disciplina: string
): Promise<LessonPlan> {

  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const systemPrompt = `
Você é um assistente pedagógico especializado em criar planos de aula criativos e alinhados à BNCC (Base Nacional Comum Curricular) brasileira.

Sua resposta DEVE ser APENAS um objeto JSON válido, sem nenhum texto adicional antes ou depois, nem markdown. O objeto deve ter EXATAMENTE a seguinte estrutura:
{
  "introducao_ludica": "...",
  "objetivo_bncc": "...",
  "passo_a_passo": "...",
  "rubrica_avaliacao": "..."
}`;

  const userPrompt = `Gere um plano de aula completo com base nas seguintes informações:
- Tema: "${tema_aula}"
- Ano Escolar: "${ano_escolar}"
- Disciplina: "${disciplina}"
- Duração da Aula: ${duracao_aula} minutos

Retorne APENAS o objeto JSON, sem markdown nem texto adicional.`;


  let result;
  try {
    result = await Promise.race([
      model.generateContent([systemPrompt, userPrompt]),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Timeout Gemini")), 40000)
      )
    ]) as any;
  } catch (err: any) {
    console.error("Erro ao gerar conteúdo com Gemini:", err.message);
    throw err;
  }

  const responseText = result.response.text();
  console.log("Resposta recebida do Gemini:", responseText);

  let planoJSON: LessonPlan;
  try {
    const cleaned = responseText.trim();
    const first = cleaned.indexOf("{");
    const last = cleaned.lastIndexOf("}") + 1;
    const jsonString = cleaned.substring(first, last);

    planoJSON = JSON.parse(jsonString) as LessonPlan;
  } catch (error) {
    throw new Error("A resposta do Gemini não veio em formato JSON válido.");
  }


  return planoJSON;
}
