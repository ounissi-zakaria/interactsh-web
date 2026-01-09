'use client';

import React, { useEffect, useRef } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-dark.css';
import 'prismjs/components/prism-http';
import { CopyIcon } from '@/components/icons';
import { copyDataToClipboard } from '@/lib';
import { Protocol } from '@/lib/types/protocol';
import { View } from '@/lib/types/view';
import './styles.scss';

interface DetailedRequestP {
  title: string;
  data: string;
  view: View;
  protocol: Protocol;
}

const DetailedRequest = ({ title, data, view, protocol }: DetailedRequestP) => {
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [data]);

  return (
    <div
      className="detailed_request_container"
      style={{
        width: view === 'side_by_side' ? '48%' : '100%',
        marginBottom: view === 'side_by_side' ? '0' : '3rem',
      }}
    >
      <span>{title}</span>
      <div className="body">
        <button type="button" className="copy_button" onClick={() => copyDataToClipboard(data)}>
          Copy <CopyIcon />
        </button>
        <div className="pre_wrapper">
          <pre className={protocol === 'http' ? 'language-http' : 'default'}>
            <code
              ref={codeRef}
              className={protocol === 'http' ? 'language-http' : 'default'}
            >
              {data}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default DetailedRequest;
