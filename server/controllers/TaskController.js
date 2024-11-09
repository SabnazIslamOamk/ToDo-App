import { ApiError } from "../helpers/ApiError.js"
import { emptyRows } from "../helpers/util.js"
import { selectAllTasks, insertTask, removeTask } from "../models/Task.js"

const getTasks = async (req,res,next) => {
    try {
        const result = await selectAllTasks()
        return res.status(200).json(emptyRows(result))
    } catch (error) {
        return next(error)
    }
}

const postTask = async (req, res, next) => {
    try {
        if (!req.body.description || req.body.description.length === 0)
            return next(new ApiError('Invalid description for task', 400))

        const result = await insertTask(req.body.description);
        return res.status(200).json({ id: result.rows[0].id });
    } catch (error) {
        return next(error);
    }
};

const deleteTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id)
            return next(new ApiError('Task ID is required', 400))

        // Attempt to delete the task
        const result = await removeTask(id);

        if (result.rowCount === 0)
            return next(new ApiError('Task not found', 404))

        return res.status(200).json({ message: 'Task deleted successfully', id });
    } catch (error) {
        return next(error);
    }
};



export {getTasks, postTask, deleteTask}