const MAX_COMMENT_LENGTH = 140;

function validateCommentLength (value) {
  return value.length <= MAX_COMMENT_LENGTH;
}

export {validateCommentLength};
export {MAX_COMMENT_LENGTH};
