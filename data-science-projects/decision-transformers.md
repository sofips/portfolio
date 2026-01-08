# Decision Transformers para Sistemas de Recomendación

## Introducción

Este proyecto explora la aplicación de **Decision Transformers** (DT) al dominio de sistemas de recomendación, utilizando un dataset de calificaciones de películas de Netflix. La idea central es reformular el problema de recomendación como un problema de **Aprendizaje por Refuerzo Offline**, donde cada sesión de interacción usuario-sistema se modela como una trayectoria de un Proceso de Decisión de Markov (MDP).

Los Decision Transformers, originalmente diseñados para tareas de NLP, han demostrado ser efectivos en RL al modelar secuencias de estados, acciones y recompensas. En lugar de aprender una política mediante optimización tradicional de RL, el DT aprende a imitar comportamientos asociados a retornos altos mediante aprendizaje supervisado sobre trayectorias históricas.

El objetivo fue evaluar si esta arquitectura puede capturar patrones usuario-ítem de forma competitiva frente a métodos tradicionales de recomendación.

---

## Metodología

### 1. Formulación del problema

Modelamos las interacciones como un MDP donde:

- **Estado**: película actual que el usuario está evaluando
- **Acción**: siguiente película recomendada
- **Recompensa**: calificación otorgada por el usuario (1-5 estrellas)
- **Return-to-Go (RTG)**: suma de recompensas futuras esperadas

Esta formulación permite condicionar las predicciones del modelo en función del retorno deseado, una característica distintiva de los Decision Transformers.

### 2. Preprocesamiento de datos

Partimos del dataset Netflix Prize, preprocesado para obtener:

- **752 películas** únicas (ítems más frecuentes)
- **8 grupos de usuarios** mediante clustering (para capturar perfiles de preferencia)
- Trayectorias de interacción con secuencias de hasta 200 timesteps

Cada trayectoria incluye: estados, acciones, recompensas, returns-to-go y el grupo del usuario.

### 3. Arquitectura del modelo

Implementamos un Decision Transformer con:

- **Embeddings separados** para estados, acciones y RTG
- **Token type embeddings** para distinguir tipos de token (RTG, estado, acción)
- **Embeddings de timestep** para codificar posición temporal
- **Embeddings de grupo de usuario** para personalización
- **Transformer Encoder** con máscara causal que respeta el orden RTG→Estado→Acción
- **Cabeza de predicción** lineal sobre las posiciones de estado

Hiperparámetros finales:

- `hidden_dim=512`, `n_layers=2`, `n_heads=4`
- `context_length=20`, `dropout=0.05`
- `learning_rate=0.0001`

### 4. Entrenamiento

El modelo se entrenó para predecir la próxima acción (película) dado el contexto histórico y el return-to-go deseado. Utilizamos:

- **Cross-entropy loss** para clasificación multiclase
- **Adam optimizer** con los parámetros mencionados
- Validación con 10% del dataset separado

### 5. Evaluación

Comparamos tres modelos usando métricas estándar de recomendación:

- **Hit Rate@K** (HR@K): proporción de veces que el ítem correcto está en el top-K
- **NDCG@K**: Normalized Discounted Cumulative Gain, que pondera la posición del hit
- **MRR**: Mean Reciprocal Rank

---

## Problemas y soluciones

### Embeddings compartidos causaban confusión

En la implementación original, estados y acciones compartían el mismo embedding, lo cual es problemático porque representan conceptos diferentes en el contexto secuencial.

**Solución**: Implementamos embeddings separados para estados y acciones, además de token type embeddings explícitos para que el modelo distinga cada tipo de token.

### Máscara causal incorrecta

La máscara de atención original no respetaba correctamente el orden causal dentro de cada timestep (RTG→Estado→Acción).

**Solución**: Diseñamos una máscara causal personalizada que permite:

- Atender a todos los timesteps anteriores
- Dentro del mismo timestep, respetar el orden RTG → Estado → Acción

### Sensibilidad al return conditioning

El rendimiento del modelo variaba significativamente según el valor de RTG usado en inferencia.

**Solución**: Realizamos experimentos sistemáticos con diferentes percentiles de RTG del conjunto de entrenamiento para encontrar el valor óptimo de condicionamiento.

---

## Resultados y conclusiones

### Comparación de modelos

| Modelo | HR@5 | NDCG@5 | HR@10 | NDCG@10 | HR@20 | NDCG@20 | MRR |
|--------|------|--------|-------|---------|-------|---------|-----|
| **DT Refactorizado** | **0.86%** | **0.54%** | **1.51%** | **0.75%** | **2.85%** | **1.08%** | **1.07%** |
| DT Referencia | 0.68% | 0.40% | 1.37% | 0.62% | 2.73% | 0.96% | 0.97% |
| Baseline Popularidad | 0.69% | 0.41% | 1.24% | 0.59% | 2.61% | 0.92% | 0.97% |

El modelo refactorizado supera tanto al código de referencia como al baseline de popularidad en todas las métricas.

### Hallazgos principales

1. **Los embeddings separados mejoran el rendimiento**: La distinción explícita entre estados y acciones permite al modelo aprender representaciones más precisas.

2. **La máscara causal correcta es crucial**: Respetar el orden de información dentro de cada timestep mejora la capacidad predictiva.

3. **El return conditioning funciona**: Condicionar en RTGs altos durante inferencia produce mejores recomendaciones, validando la hipótesis central de los Decision Transformers.

4. **Los grupos de usuario aportan información**: El embedding de grupo permite cierto grado de personalización sin requerir históricos extensos.

### Limitaciones

- Los valores absolutos de las métricas son bajos debido a la dificultad inherente del problema (espacio de 752 ítems posibles)
- El modelo no supera drásticamente al baseline, sugiriendo que para recomendación offline existen métodos más especializados
- El entrenamiento requiere GPU y tiempos considerables

### Conclusiones

Este proyecto demuestra que los Decision Transformers pueden aplicarse al dominio de recomendación, aunque con resultados modestos. La principal contribución fue la refactorización y mejora arquitectónica del modelo, logrando superar la implementación de referencia.

La experiencia resalta la importancia de entender profundamente la arquitectura Transformer y adaptar correctamente los componentes (embeddings, máscaras, predicción) al dominio específico. Aunque los DTs no reemplazan a métodos especializados de recomendación, ofrecen un framework unificado interesante que conecta RL y sequence modeling.

---

## Links

- [Repositorio del proyecto en GitHub](#)
- [Informe en español](#)

## Agradecimientos

Este trabajo fue desarrollado para la materia **Aprendizaje por Refuerzos** en el marco de la Diplomatura en Ciencia de Datos (FAMAF, 2025). Realizado en conjunto con Felipe Ávila. ¡Gracias por el trabajo en equipo!
