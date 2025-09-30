import { YoutubeTranscript } from 'youtube-transcript';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { videoId } = req.query;
    
    if (!videoId) {
      return res.status(400).json({ error: 'videoId obrigatório' });
    }

    const transcript = await YoutubeTranscript.fetchTranscript(videoId, {
      lang: 'pt'
    });

    const textoCompleto = transcript.map(item => item.text).join(' ');

    return res.status(200).json({
      success: true,
      transcricao: textoCompleto
    });

  } catch (error) {
    return res.status(500).json({
      error: 'Erro ao buscar transcrição',
      details: error.message
    });
  }
}
