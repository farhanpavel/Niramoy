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
                youtube_link: meal.youtube_link || null,
                user_id: id, // Handle YouTube link
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
              user_id: id, // Handle YouTube link
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
const updateExercises = async (responseJson, user_id, templateName) => {
  try {
    // Validate input
    if (!user_id || typeof user_id !== "string") {
      throw new Error(`Invalid user_id: ${user_id}`);
    }

    // Step 1: Handle the exercise structure (array of objects containing 'exercise')
    let exercises = [];

    if (Array.isArray(responseJson)) {
      // If it's an array of objects with an 'exercise' key, extract each exercise
      exercises = responseJson
        .map((item) => item.exercise)
        .filter((exercise) => exercise); // Ensure it's not null
    } else if (responseJson.exercise) {
      // If there's a single exercise, put it in an array
      exercises = [responseJson.exercise];
    } else {
      throw new Error(
        `Invalid exercises array or object: ${JSON.stringify(responseJson)}`
      );
    }

    // Step 2: Retrieve the response_id for the user (assuming there's a foreign key relationship)
    const response = await prisma.response.findFirst({
      where: {
        user_id: user_id, // Assuming user_id maps to the response
      },
      select: {
        ai_response_id: true, // Directly select the response_id
      },
    });

    if (!response) {
      throw new Error(`No response found for user_id: ${user_id}`);
    }

    const responseId = response.ai_response_id; // The response_id is now correctly retrieved

    // Step 3: Delete existing exercises for the user
    await prisma.exercise.deleteMany({
      where: {
        user_id: user_id,
      },
    });
    console.log(`Deleted existing exercises for user_id: ${user_id}`);

    // Step 4: Insert new exercises with the correct response_id
    if (exercises.length > 0) {
      const exercisesToInsert = exercises.map((exercise) => ({
        user_id: user_id,
        name: exercise.name,
        description: exercise.description,
        category: exercise.category,
        duration_minutes: exercise.duration_minutes,
        youtube_link: exercise.youtube_link || null, // Assuming no link in the provided template
        response_id: responseId, // Use the retrieved response_id
      }));

      await prisma.exercise.createMany({
        data: exercisesToInsert,
      });
      console.log(
        `Inserted ${exercisesToInsert.length} exercises for user_id: ${user_id}`
      );
    } else {
      console.log(`No exercises provided for user_id: ${user_id}`);
    }
  } catch (error) {
    console.error("Error updating exercises for user:", error);
  } finally {
    await prisma.$disconnect();
  }
};
const updateDietPlan = async (responseJson, user_id) => {
  // Step 1: Retrieve the dietPlanId for the user
  const response = await prisma.meal.findFirst({
    where: {
      user_id: user_id,
    },
    select: {
      dietPlanId: true,
    },
  });

  const responseId = response.dietPlanId;

  // Step 2: Transaction to update diet plan and meals
  // Step 2a: Delete existing diet plans for the user
  await prisma.meal.deleteMany({
    where: {
      user_id: user_id,
    },
  });
  console.log("successfull");
  // Step 2b: Insert meals associated with the new diet plan
  //     if (!Array.isArray(responseJson.meals)) {
  //       throw new TypeError("responseJson.meals must be an array");
  //     }

  for (const [mealTime, meal] of Object.entries(responseJson.meals)) {
    // Validate meal data before inserting
    if (!meal.items || !meal.recipe_description) {
      console.error("Invalid meal data:", meal);
      continue; // Skip invalid meal entries
    }

    await prisma.meal.create({
      data: {
        dietPlanId: responseId, // Link meal to the created diet plan
        type: mealTime, // Use the key (e.g., breakfast, lunch, dinner) as mealTime
        items: meal.items, // Items in the meal
        recipe_description: meal.recipe_description, // Recipe description
        youtube_link: meal.youtube_link || null, // Optional YouTube link
        user_id: user_id, // Link meal to the user
      },
    });
    console.log(`Inserted meal: ${mealTime} for diet plan: ${responseId}`);
  }

  console.log("Diet plan and meals updated successfully.");
  // } catch (error) {
  //   console.error("Error updating diet plan for user:", error);
  // } finally {
  //   await prisma.$disconnect();
  // }
};

export { updateDietPlan };

export { updateExercises };

export { pushToDB };
