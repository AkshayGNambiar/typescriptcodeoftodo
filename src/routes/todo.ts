import express, { Router, Request, Response } from 'express';
import { authenticateJwt } from '../middleware/index';
import { Todo} from '../db'; // Ensure you have the appropriate types for Todo and TodoModel

const router: Router = express.Router();
interface TodoModel{
  title:string;
  description:string;
  done:boolean;
  userId:string;
}
interface CustomRequest extends Request{
  userId:string;
}

router.post('/todos', authenticateJwt, (req: CustomRequest, res: Response) => {
  const { title, description } = req.body;
  const done: boolean = false;
  const userId: string = req.userId;

  const newTodo: TodoModel = new Todo({ title, description, done, userId });

  newTodo.save()
    .then((savedTodo: TodoModel) => {
      res.status(201).json(savedTodo);
    })
    .catch((err: Error) => {
      res.status(500).json({ error: 'Failed to create a new todo' });
    });
});

router.get('/todos', authenticateJwt, (req: Request, res: Response) => {
  const userId: string = req.userId;

  Todo.find({ userId })
    .then((todos: TodoModel[]) => {
      res.json(todos);
    })
    .catch((err: Error) => {
      res.status(500).json({ error: 'Failed to retrieve todos' });
    });
});

router.patch('/todos/:todoId/done', authenticateJwt, (req: Request, res: Response) => {
  const { todoId } = req.params;
  const userId: string = req.userId;

  Todo.findOneAndUpdate({ _id: todoId, userId }, { done: true }, { new: true })
    .then((updatedTodo: TodoModel | null) => {
      if (!updatedTodo) {
        return res.status(404).json({ error: 'Todo not found' });
      }
      res.json(updatedTodo);
    })
    .catch((err: Error) => {if(err)
      res.status(500).json({ error: 'Failed to update todo' });
    });
});

export default  router;
