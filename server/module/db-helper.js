import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const pushToDB = async (jsonResponse, id, type) => {
  try {
    if (type === "template.json") {
      let aiResponse = null;
      await prisma.user.update({
        where: { user_id: id },
        data: { status: 1 },
      });
      // Handle AI Responses
      if (jsonResponse.ai_response && Array.isArray(jsonResponse.ai_response)) {
        for (const response of jsonResponse.ai_response) {
          aiResponse = await prisma.aIResponse.create({
            data: {
              conversation_id: response.conversation_id,
              content: response.content,
              created_at: new Date(response.created_at),
            },
          });
        }
      }

      let createdDietPlan = null;

      // Handle Diet Plan and Meals
      if (jsonResponse.diet_plan) {
        const dietPlan = jsonResponse.diet_plan;
        createdDietPlan = await prisma.dietPlan.create({
          data: {
            name: dietPlan.name,
            description: dietPlan.description,
            calorie_target: dietPlan.calorie_target,
          },
        });

        if (dietPlan.meals) {
          for (const [mealType, meal] of Object.entries(dietPlan.meals)) {
            await prisma.meal.create({
              data: {
                dietPlanId: createdDietPlan.id,
                type: mealType,
                items: meal.items,
                recipe_description: meal.recipe_description,
                youtube_link: meal.youtube_link || null, // Handle YouTube link
              },
            });
          }
        }
      }

      // Create Response
      const createdResponse = await prisma.response.create({
        data: {
          ai_response_id: aiResponse ? aiResponse.id : null, // Ensure ID is valid
          diet_plan_id: createdDietPlan ? createdDietPlan.id : null,
          user_id: id,
        },
      });

      // Handle Exercises (if the array is provided and not empty)
      if (jsonResponse.exercises && jsonResponse.exercises.length > 0) {
        for (const exercise of jsonResponse.exercises) {
          await prisma.exercise.create({
            data: {
              name: exercise.name,
              description: exercise.description,
              category: exercise.category,
              duration_minutes: exercise.duration_minutes,
              youtube_link: exercise.youtube_link || null, // Handle YouTube link
              response_id: createdResponse.id, // Link to the response
            },
          });
        }
      }
    }

    console.log("Data pushed to the database successfully.");
  } catch (error) {
    console.error("Error pushing data to the database:", error);
  } finally {
    await prisma.$disconnect();
  }
};

export { pushToDB };
