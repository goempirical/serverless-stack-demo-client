import React from 'react';
import { Button, Glyphicon } from 'react-bootstrap';

export default function LoaderButton({ isLoading, text, loadingText, disabled = false, ...props }) {
  return (
    <Button disabled={ disabled || isLoading } {...props}>
      { isLoading && <Glyphicon glyph="refresh" className="spinning" /> }
      { ! isLoading ? text : loadingText }
    </Button>
  );
}
