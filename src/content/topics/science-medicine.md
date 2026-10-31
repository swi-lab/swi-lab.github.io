+++
title = "Science and Medicine"
order = 3
ongoing = [
  "Shared neural operator across modalities",
  "Ranking-aware prompt evolution for multimodal clinical diagnosis",
  "4D brain imaging via functional ultrasound",
]

[[areas]]
title = "Inverse problems"
summary = "Recovering structure from partial, noisy measurements."
tags = ["Compressed-sensing MRI", "Sparse-view CT", "Lung ultrasound", "Photoacoustic tomography", "Functional ultrasound"]
papers = ["Jatyani2024", "datta2026resolution", "wang2024lung"]

[areas.figure]
src = "../../assets/research/nomri.webp"
alt = "One neural operator reconstructs MRI across undersampling patterns and resolutions, where existing CNNs need a separate model per pattern."
paper = "Jatyani2024"

[[areas]]
title = "Forward models"
summary = "Learned simulators and surrogates."
tags = ["Turbulence and chaotic systems", "Multiphysics PDE surrogates", "Wave and acoustic simulation", "Satellite pose estimation"]
papers = ["wang2024beyond"]

[areas.figure]
src = "../../assets/research/coarse-graining.webp"
alt = "Training and inference for fully resolved simulation, coarse graining with closure models, and coarse graining with neural operators."
paper = "wang2024beyond"

[[areas]]
title = "Clinical and healthcare data"
summary = "Multimodal diagnosis and decision support."
tags = ["Ocular surface disease", "Surgical video and skill assessment", "Prognosis under class imbalance", "Calibrated deferral to clinicians"]
papers = ["yeh2024insight", "gutpa2024", "lifestyle2024"]

[areas.figure]
src = "../../assets/research/surgical-feedback.webp"
alt = "Feedback given during surgery is recorded, and its effectiveness is predicted automatically instead of annotated by hand."
paper = "gutpa2024"
+++
We develop physics-informed and multimodal AI for science and medicine.
