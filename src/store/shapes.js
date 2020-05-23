import PropTypes from 'prop-types';

export const MarkPosShape = PropTypes.shape({
  ch: PropTypes.number,
  line: PropTypes.number
});

export const MarkShape = PropTypes.shape({
  type: PropTypes.string,
  from: MarkPosShape,
  to: MarkPosShape
});

export const MarkListShape = PropTypes.arrayOf(MarkShape);

export const SnippetShape = PropTypes.shape({
  title: PropTypes.string,
  lang: PropTypes.string,
  code: PropTypes.string,
  note: PropTypes.string
});

export const SnippetListShape = PropTypes.arrayOf(SnippetShape);

export const AuthShape = PropTypes.shape({
  isUser: PropTypes.bool,
  isGuest: PropTypes.bool,
  userId: PropTypes.string,
  displayName: PropTypes.string
});

export const ToolbarButtonListShape = PropTypes.arrayOf(
  PropTypes.shape({
    action: PropTypes.string,
    icon: PropTypes.string
  })
);
