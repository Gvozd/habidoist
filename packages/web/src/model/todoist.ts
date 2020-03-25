/* eslint-disable camelcase */
import axios from 'axios';

const labels = ['habitica'];

export async function test() {
  const labelsIds = (await getLabels())
    .filter(({ name }) => labels.includes(name))
    .map((label) => label.id);
  console.log(labelsIds);
  for (const label_id of labelsIds) {
    // eslint-disable-next-line no-await-in-loop
    console.log(await get('https://api.todoist.com/rest/v1/tasks', { label_id }));
  }
}

test();


export async function getLabels(): Promise<TodoistLabel[]> {
  return get('https://api.todoist.com/rest/v1/labels');
}
export async function getTasks(params = {}): Promise<TodoistTask[]> {
  return get('https://api.todoist.com/rest/v1/tasks', params);
}
export async function get(url: string, params = {}) {
  const httpResult = await axios.get(url, {
    params,
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_TODOIST_API_TOKEN}`,
    },
  });

  return httpResult.data;
}

export interface TodoistLabel {
  id: number;
  name: string;
  color: number;
  order: number;
}

export interface TodoistTask {
  id: number;
  project_id: number;
  section_id: number;
  content: string;
  completed: boolean;
  label_ids: number[];
  parent: number;
  order: number;
  priority: number;
  due: Object;// TODO
  url: string;
  comment_count: number;
}
