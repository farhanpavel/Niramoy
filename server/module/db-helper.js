import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const pushToDB = async (jsonResponse, type) => {
  try {
    if (type === 'template.json') {
      // Handle AI Responses

      let aiResponse = null;
      if (jsonResponse.ai_response && Array.isArray(jsonResponse.ai_response)) {
        for (const response of jsonResponse.ai_response) {
          aiResponse=await prisma.aIResponse.create({
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
              },
            });
          }
        }
      }

      //create response 

      await prisma.response.create({
        data: {
          ai_response_id: aiResponse.id,
          diet_plan_id: createdDietPlan.id,
        },
      });

      // Handle Exercises
      if (jsonResponse.exercises && Array.isArray(jsonResponse.exercises)) {
        for (const exercise of jsonResponse.exercises) {
          await prisma.exercise.create({
            data: {
              name: exercise.name,
              description: exercise.description,
              category: exercise.category,
              duration_minutes: exercise.duration_minutes,
              response_id: aiResponse.id,
            },
          });
        }
      }




    }

    console.log('Data pushed to the database successfully.');
  } catch (error) {
    console.error('Error pushing data to the database:', error);
  } finally {
    await prisma.$disconnect();
  }
};

export { pushToDB };
