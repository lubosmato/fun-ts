import { Ok, Option, Some, Result, Err } from "ts-results-es";

type PostData = {
  id: string;
};

type Post = {
  id: string;
  title: string;
  text: string;
  date: Date;
};

function getInput(): Option<PostData> {
  return Some({ id: "test" });
}
async function savePostToDb(post: PostData): Promise<Result<Post, "db error">> {
  // use post parameter
  return Ok({ id: "test", title: "title", text: "text", date: new Date() });
}
async function sendPostViaEmail(
  post: Post
): Promise<Result<Post, "email error">> {
  // use post parameter
  return Ok({ id: "test", title: "title", text: "text", date: new Date() });
}

async function savePost() {
  return getInput()
    .toResult("input error" as const)
    .toAsyncResult()
    .andThen(savePostToDb)
    .andThen(sendPostViaEmail).promise;
}

async function caller() {
  const post = await savePost();
  if (post.isOk()) {
    console.log(post.value);
  } else {
    console.error(post.error);
  }

  const nullablePost = post.unwrapOr(null);
  return nullablePost;
}
