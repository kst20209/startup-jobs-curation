import React from 'react';
import Image from 'next/image';

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="notion-page-content" style={{
          flexShrink: 0,
          flexGrow: 1,
          maxWidth: '100%',
          display: 'flex',
          alignItems: 'flex-start',
          flexDirection: 'column',
          fontSize: '16px',
          lineHeight: 1.5,
          width: '100%',
          zIndex: 4,
          padding: '8px 0px 0px'
        }}>
          
          {/* 메인 제목 */}
          <div className="notion-sub_header-block" style={{
            width: '100%',
            maxWidth: '944px',
            marginTop: '1.4em',
            marginBottom: '1px'
          }}>
            <div style={{
              display: 'flex',
              width: '100%',
              color: '#000000',
              fill: 'inherit'
            }}>
              <h3 style={{
                maxWidth: '100%',
                width: '100%',
                whiteSpace: 'break-spaces',
                wordBreak: 'break-word',
                caretColor: '#000000',
                color: '#000000',
                padding: '3px 2px',
                fontFamily: 'ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI Variable Display", "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol"',
                fontWeight: 600,
                fontSize: '1.5em',
                lineHeight: 1.3,
                margin: 0
              }}>
                🌟 렛츠커리어가 알려주는 채용공고!
              </h3>
            </div>
          </div>

          {/* 소개 텍스트 */}
          <div className="notion-text-block" style={{
            width: '100%',
            maxWidth: '944px',
            marginTop: '1px',
            marginBottom: '1px'
          }}>
            <div style={{ color: '#000000', fill: 'inherit' }}>
              <div style={{ display: 'flex' }}>
                <div style={{
                  maxWidth: '100%',
                  width: '100%',
                  whiteSpace: 'break-spaces',
                  wordBreak: 'break-word',
                  caretColor: '#000000',
                  color: '#000000',
                  padding: '3px 2px'
                }}>
                  렛츠커리어는 문과 계열 취준생에게 집중하여, 채용공고를 큐레이션 합니다.
                </div>
              </div>
            </div>
          </div>

          <div className="notion-text-block" style={{
            width: '100%',
            maxWidth: '944px',
            marginTop: '1px',
            marginBottom: '1px'
          }}>
            <div style={{ color: '#000000', fill: 'inherit' }}>
              <div style={{ display: 'flex' }}>
                <div style={{
                  maxWidth: '100%',
                  width: '100%',
                  whiteSpace: 'break-spaces',
                  wordBreak: 'break-word',
                  caretColor: '#000000',
                  color: '#000000',
                  padding: '3px 2px'
                }}>
                  <span style={{ fontWeight: 600, color: '#000000' }}>단순히 나열형으로 채용공고를 소개하는 것에서 그치지 않아요.</span>
                </div>
              </div>
            </div>
          </div>

          <div className="notion-text-block" style={{
            width: '100%',
            maxWidth: '944px',
            marginTop: '1px',
            marginBottom: '1px'
          }}>
            <div style={{ color: '#000000', fill: 'inherit' }}>
              <div style={{ display: 'flex' }}>
                <div style={{
                  maxWidth: '100%',
                  width: '100%',
                  whiteSpace: 'break-spaces',
                  wordBreak: 'break-word',
                  caretColor: '#000000',
                  color: '#000000',
                  padding: '3px 2px'
                }}>
                  1️⃣ 채용 공고를 분석해드리거나,
                </div>
              </div>
            </div>
          </div>

          <div className="notion-text-block" style={{
            width: '100%',
            maxWidth: '944px',
            marginTop: '1px',
            marginBottom: '1px'
          }}>
            <div style={{ color: '#000000', fill: 'inherit' }}>
              <div style={{ display: 'flex' }}>
                <div style={{
                  maxWidth: '100%',
                  width: '100%',
                  whiteSpace: 'break-spaces',
                  wordBreak: 'break-word',
                  caretColor: '#000000',
                  color: '#000000',
                  padding: '3px 2px'
                }}>
                  2️⃣ 잘 모르는 좋은 회사를 발굴하여 소개해드리거나,
                </div>
              </div>
            </div>
          </div>

          <div className="notion-text-block" style={{
            width: '100%',
            maxWidth: '944px',
            marginTop: '1px',
            marginBottom: '1px'
          }}>
            <div style={{ color: '#000000', fill: 'inherit' }}>
              <div style={{ display: 'flex' }}>
                <div style={{
                  maxWidth: '100%',
                  width: '100%',
                  whiteSpace: 'break-spaces',
                  wordBreak: 'break-word',
                  caretColor: '#000000',
                  color: '#000000',
                  padding: '3px 2px'
                }}>
                  3️⃣ 다른 플랫폼에서 잘 보지 못했던 공고들을 모아서 알려드릴거에요.
                </div>
              </div>
            </div>
          </div>

          <div className="notion-text-block" style={{
            width: '100%',
            maxWidth: '944px',
            marginTop: '1.5rem',
            marginBottom: '1px'
          }}>
            <div style={{ color: '#000000', fill: 'inherit' }}>
              <div style={{ display: 'flex' }}>
                <div style={{
                  maxWidth: '100%',
                  width: '100%',
                  whiteSpace: 'break-spaces',
                  wordBreak: 'break-word',
                  caretColor: '#000000',
                  color: '#000000',
                  padding: '3px 2px'
                }}>
                  <span style={{ fontWeight: 600, color: '#000000' }}>렛츠커리어가 만드는 채용공고 플랫폼을 기대해주세요 🙂</span>
                </div>
              </div>
            </div>
          </div>

          {/* 채용공고 오픈채팅방 섹션 */}
          <div className="notion-sub_header-block" style={{
            width: '100%',
            maxWidth: '944px',
            marginTop: '4rem',
            marginBottom: '1px'
          }}>
            <div style={{
              display: 'flex',
              width: '100%',
              color: '#000000',
              fill: 'inherit'
            }}>
              <h3 style={{
                maxWidth: '100%',
                width: '100%',
                whiteSpace: 'break-spaces',
                wordBreak: 'break-word',
                caretColor: '#000000',
                color: '#000000',
                padding: '3px 2px',
                fontFamily: 'ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI Variable Display", "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol"',
                fontWeight: 600,
                fontSize: '1.5em',
                lineHeight: 1.3,
                margin: 0
              }}>
                🔽 채용공고 오픈채팅방 접속하기!
              </h3>
            </div>
          </div>

          {/* 마케팅 직무 */}
          <div className="notion-sub_sub_header-block" style={{
            width: '100%',
            maxWidth: '944px',
            marginTop: '1em',
            marginBottom: '1px'
          }}>
            <div style={{
              display: 'flex',
              width: '100%',
              color: '#000000',
              fill: 'inherit'
            }}>
              <h4 style={{
                maxWidth: '100%',
                width: '100%',
                whiteSpace: 'break-spaces',
                wordBreak: 'break-word',
                caretColor: '#000000',
                color: '#000000',
                padding: '3px 2px',
                fontFamily: 'ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI Variable Display", "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol"',
                fontWeight: 600,
                fontSize: '1.25em',
                lineHeight: 1.3,
                margin: 0
              }}>
                마케팅 직무
              </h4>
            </div>
          </div>

          <div className="notion-bookmark-block" style={{
            width: '100%',
            maxWidth: '944px',
            marginTop: '4px',
            marginBottom: '4px'
          }}>
            <div className="open_chat" style={{ display: 'flex' }}>
              <a href="https://open.kakao.com/o/g9JmRSFh" target="_blank" rel="noopener noreferrer" className="open_chat" style={{
                display: 'flex',
                color: 'inherit',
                textDecoration: 'none',
                userSelect: 'none',
                transition: 'background 20ms ease-in',
                cursor: 'pointer',
                flexGrow: 1,
                minWidth: 0,
                flexWrap: 'wrap-reverse',
                alignItems: 'stretch',
                textAlign: 'left',
                overflow: 'hidden',
                border: '1px solid rgba(55, 53, 47, 0.16)',
                borderRadius: '10px',
                position: 'relative',
                fill: 'inherit'
              }}>
                <div className="open_chat" style={{
                  flex: '4 1 180px',
                  padding: '12px 14px 14px',
                  overflow: 'hidden',
                  textAlign: 'left'
                }}>
                  <div className="open_chat" style={{
                    fontSize: '14px',
                    lineHeight: '20px',
                    color: '#000000',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    minHeight: '24px',
                    marginBottom: '2px'
                  }}>
                    <span id="openTitle" style={{ color: '#000000' }}>[렛츠커리어] 마케팅 채용공고 큐레이션</span>
                  </div>
                  <div className="open_chat" style={{ display: 'flex', marginTop: '6px' }}>
                    <Image src="/kakao-favicon.png" className="open_chat" style={{
                      width: '16px',
                      height: '16px',
                      minWidth: '16px',
                      marginRight: '6px'
                    }} alt="" width={16} height={16} />
                    <div className="open_chat" style={{
                      fontSize: '12px',
                      lineHeight: '16px',
                      color: '#000000',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      https://open.kakao.com/o/g9JmRSFh
                    </div>
                  </div>
                </div>
                <div className="open_chat" style={{
                  flex: '1 1 180px',
                  display: 'block',
                  position: 'relative'
                }}>
                  <div className="open_chat" style={{ position: 'absolute', inset: 0 }}>
                    <div className="open_chat" style={{ width: '100%', height: '100%' }}>
                      <Image alt="" src="/kakaochat_1.png" className="open_chat" style={{
                        display: 'block',
                        objectFit: 'cover',
                        borderRadius: '2px',
                        width: '100%',
                        height: '100%'
                      }} width={180} height={94} />
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* 세일즈 직무 */}
          <div className="notion-sub_sub_header-block" style={{
            width: '100%',
            maxWidth: '944px',
            marginTop: '1em',
            marginBottom: '1px'
          }}>
            <div style={{
              display: 'flex',
              width: '100%',
              color: 'inherit',
              fill: 'inherit'
            }}>
              <h4 style={{
                maxWidth: '100%',
                width: '100%',
                whiteSpace: 'break-spaces',
                wordBreak: 'break-word',
                caretColor: '#000000',
                padding: '3px 2px',
                fontFamily: 'ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI Variable Display", "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol"',
                fontWeight: 600,
                fontSize: '1.25em',
                lineHeight: 1.3,
                margin: 0
              }}>
                세일즈 직무
              </h4>
            </div>
          </div>

          <div className="notion-bookmark-block" style={{
            width: '100%',
            maxWidth: '944px',
            marginTop: '4px',
            marginBottom: '4px'
          }}>
            <div className="open_chat" style={{ display: 'flex' }}>
              <a href="https://open.kakao.com/o/gZgMRSFh" target="_blank" rel="noopener noreferrer" className="open_chat" style={{
                display: 'flex',
                color: 'inherit',
                textDecoration: 'none',
                userSelect: 'none',
                transition: 'background 20ms ease-in',
                cursor: 'pointer',
                flexGrow: 1,
                minWidth: 0,
                flexWrap: 'wrap-reverse',
                alignItems: 'stretch',
                textAlign: 'left',
                overflow: 'hidden',
                border: '1px solid rgba(55, 53, 47, 0.16)',
                borderRadius: '10px',
                position: 'relative',
                fill: 'inherit'
              }}>
                <div className="open_chat" style={{
                  flex: '4 1 180px',
                  padding: '12px 14px 14px',
                  overflow: 'hidden',
                  textAlign: 'left'
                }}>
                  <div className="open_chat" style={{
                    fontSize: '14px',
                    lineHeight: '20px',
                    color: '#000000',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    minHeight: '24px',
                    marginBottom: '2px'
                  }}>
                    <span id="openTitle">[렛츠커리어] 세일즈 채용공고 큐레이션</span>
                  </div>
                  <div className="open_chat" style={{ display: 'flex', marginTop: '6px' }}>
                    <Image src="/kakao-favicon.png" className="open_chat" style={{
                      width: '16px',
                      height: '16px',
                      minWidth: '16px',
                      marginRight: '6px'
                    }} alt="" width={16} height={16} />
                    <div className="open_chat" style={{
                      fontSize: '12px',
                      lineHeight: '16px',
                      color: '#000000',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      https://open.kakao.com/o/gZgMRSFh
                    </div>
                  </div>
                </div>
                <div className="open_chat" style={{
                  flex: '1 1 180px',
                  display: 'block',
                  position: 'relative'
                }}>
                  <div className="open_chat" style={{ position: 'absolute', inset: 0 }}>
                    <div className="open_chat" style={{ width: '100%', height: '100%' }}>
                      <Image alt="" src="/kakaochat_2.png" className="open_chat" style={{
                        display: 'block',
                        objectFit: 'cover',
                        borderRadius: '2px',
                        width: '100%',
                        height: '100%'
                      }} width={180} height={94} />
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* 기획 직무 */}
          <div className="notion-sub_sub_header-block" style={{
            width: '100%',
            maxWidth: '944px',
            marginTop: '1em',
            marginBottom: '1px'
          }}>
            <div style={{
              display: 'flex',
              width: '100%',
              color: 'inherit',
              fill: 'inherit'
            }}>
              <h4 style={{
                maxWidth: '100%',
                width: '100%',
                whiteSpace: 'break-spaces',
                wordBreak: 'break-word',
                caretColor: '#000000',
                padding: '3px 2px',
                fontFamily: 'ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI Variable Display", "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol"',
                fontWeight: 600,
                fontSize: '1.25em',
                lineHeight: 1.3,
                margin: 0
              }}>
                기획 직무
              </h4>
            </div>
          </div>

          <div className="notion-bookmark-block" style={{
            width: '100%',
            maxWidth: '944px',
            marginTop: '4px',
            marginBottom: '4px'
          }}>
            <div className="open_chat" style={{ display: 'flex' }}>
              <a href="https://open.kakao.com/o/gPDpSSFh" target="_blank" rel="noopener noreferrer" className="open_chat" style={{
                display: 'flex',
                color: 'inherit',
                textDecoration: 'none',
                userSelect: 'none',
                transition: 'background 20ms ease-in',
                cursor: 'pointer',
                flexGrow: 1,
                minWidth: 0,
                flexWrap: 'wrap-reverse',
                alignItems: 'stretch',
                textAlign: 'left',
                overflow: 'hidden',
                border: '1px solid rgba(55, 53, 47, 0.16)',
                borderRadius: '10px',
                position: 'relative',
                fill: 'inherit'
              }}>
                <div className="open_chat" style={{
                  flex: '4 1 180px',
                  padding: '12px 14px 14px',
                  overflow: 'hidden',
                  textAlign: 'left'
                }}>
                  <div className="open_chat" style={{
                    fontSize: '14px',
                    lineHeight: '20px',
                    color: '#000000',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    minHeight: '24px',
                    marginBottom: '2px'
                  }}>
                    <span id="openTitle">[렛츠커리어] 기획/운영 채용공고 큐레이션</span>
                  </div>
                  <div className="open_chat" style={{ display: 'flex', marginTop: '6px' }}>
                    <Image src="/kakao-favicon.png" className="open_chat" style={{
                      width: '16px',
                      height: '16px',
                      minWidth: '16px',
                      marginRight: '6px'
                    }} alt="" width={16} height={16} />
                    <div className="open_chat" style={{
                      fontSize: '12px',
                      lineHeight: '16px',
                      color: '#000000',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      https://open.kakao.com/o/gPDpSSFh
                    </div>
                  </div>
                </div>
                <div className="open_chat" style={{
                  flex: '1 1 180px',
                  display: 'block',
                  position: 'relative'
                }}>
                  <div className="open_chat" style={{ position: 'absolute', inset: 0 }}>
                    <div className="open_chat" style={{ width: '100%', height: '100%' }}>
                      <Image alt="" src="/kakaochat_1.png" className="open_chat" style={{
                        display: 'block',
                        objectFit: 'cover',
                        borderRadius: '2px',
                        width: '100%',
                        height: '100%'
                      }} width={180} height={94} />
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* 인사/HR/경영관리 직무 */}
          <div className="notion-sub_sub_header-block" style={{
            width: '100%',
            maxWidth: '944px',
            marginTop: '1em',
            marginBottom: '1px'
          }}>
            <div style={{
              display: 'flex',
              width: '100%',
              color: 'inherit',
              fill: 'inherit'
            }}>
              <h4 style={{
                maxWidth: '100%',
                width: '100%',
                whiteSpace: 'break-spaces',
                wordBreak: 'break-word',
                caretColor: '#000000',
                padding: '3px 2px',
                fontFamily: 'ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI Variable Display", "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol"',
                fontWeight: 600,
                fontSize: '1.25em',
                lineHeight: 1.3,
                margin: 0
              }}>
                인사/HR/경영관리 직무
              </h4>
            </div>
          </div>

          <div className="notion-bookmark-block" style={{
            width: '100%',
            maxWidth: '944px',
            marginTop: '4px',
            marginBottom: '4px'
          }}>
            <div className="open_chat" style={{ display: 'flex' }}>
              <a href="https://open.kakao.com/o/ghzwTSFh" target="_blank" rel="noopener noreferrer" className="open_chat" style={{
                display: 'flex',
                color: 'inherit',
                textDecoration: 'none',
                userSelect: 'none',
                transition: 'background 20ms ease-in',
                cursor: 'pointer',
                flexGrow: 1,
                minWidth: 0,
                flexWrap: 'wrap-reverse',
                alignItems: 'stretch',
                textAlign: 'left',
                overflow: 'hidden',
                border: '1px solid rgba(55, 53, 47, 0.16)',
                borderRadius: '10px',
                position: 'relative',
                fill: 'inherit'
              }}>
                <div className="open_chat" style={{
                  flex: '4 1 180px',
                  padding: '12px 14px 14px',
                  overflow: 'hidden',
                  textAlign: 'left'
                }}>
                  <div className="open_chat" style={{
                    fontSize: '14px',
                    lineHeight: '20px',
                    color: '#000000',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    minHeight: '24px',
                    marginBottom: '2px'
                  }}>
                    <span id="openTitle">[렛츠커리어] 인사/HR/경영관리 채용공고 큐레이션</span>
                  </div>
                  <div className="open_chat" style={{ display: 'flex', marginTop: '6px' }}>
                    <Image src="/kakao-favicon.png" className="open_chat" style={{
                      width: '16px',
                      height: '16px',
                      minWidth: '16px',
                      marginRight: '6px'
                    }} alt="" width={16} height={16} />
                    <div className="open_chat" style={{
                      fontSize: '12px',
                      lineHeight: '16px',
                      color: '#000000',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      https://open.kakao.com/o/ghzwTSFh
                    </div>
                  </div>
                </div>
                <div className="open_chat" style={{
                  flex: '1 1 180px',
                  display: 'block',
                  position: 'relative'
                }}>
                  <div className="open_chat" style={{ position: 'absolute', inset: 0 }}>
                    <div className="open_chat" style={{ width: '100%', height: '100%' }}>
                      <Image alt="" src="/kakaochat_3.png" className="open_chat" style={{
                        display: 'block',
                        objectFit: 'cover',
                        borderRadius: '2px',
                        width: '100%',
                        height: '100%'
                      }} width={180} height={94} />
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* 합격 소식 알리기 섹션 */}
          <div className="notion-sub_sub_header-block" style={{
            width: '100%',
            maxWidth: '944px',
            marginTop: '4rem',
            marginBottom: '1px'
          }}>
            <div style={{
              display: 'flex',
              width: '100%',
              color: 'inherit',
              fill: 'inherit'
            }}>
              <h4 style={{
                maxWidth: '100%',
                width: '100%',
                whiteSpace: 'break-spaces',
                wordBreak: 'break-word',
                caretColor: '#000000',
                padding: '3px 2px',
                fontFamily: 'ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI Variable Display", "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol"',
                fontWeight: 600,
                fontSize: '1.25em',
                lineHeight: 1.3,
                margin: 0
              }}>
                🎉 렛츠커리어의 큐레이션 채용공고를 보고 합격하셨다면,
              </h4>
            </div>
          </div>

          <div className="notion-text-block" style={{
            width: '100%',
            maxWidth: '944px',
            marginTop: '1px',
            marginBottom: '1px'
          }}>
            <div style={{ color: 'inherit', fill: 'inherit' }}>
              <div style={{ display: 'flex' }}>
                <div style={{
                  maxWidth: '100%',
                  width: '100%',
                  whiteSpace: 'break-spaces',
                  wordBreak: 'break-word',
                  caretColor: '#000000',
                  padding: '3px 2px'
                }}>
                  기쁜 소식을 저희에게도 알려주세요! <br />
                  1:1 톡으로 알려주시면 됩니다!
                </div>
              </div>
            </div>
          </div>

          <div className="notion-text-block" style={{
            width: '100%',
            maxWidth: '944px',
            marginTop: '1px',
            marginBottom: '1px'
          }}>
            <div style={{ color: 'inherit', fill: 'inherit' }}>
              <div style={{ display: 'flex' }}>
                <div style={{
                  maxWidth: '100%',
                  width: '100%',
                  whiteSpace: 'nowrap',
                  wordBreak: 'break-word',
                  caretColor: '#000000',
                  padding: '3px 2px',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  → <a href="https://open.kakao.com/o/sjg7MSFh" target="_blank" rel="noopener noreferrer" style={{
                    color: 'inherit',
                    textDecoration: 'inherit',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    marginLeft: '8px'
                  }}>
                    <Image style={{
                      width: '1.2em',
                      height: '1.2em',
                      borderRadius: '3px',
                      verticalAlign: '-0.22em',
                      marginRight: '0.3em'
                    }} src="/kakao-favicon.png" alt="" width={19} height={19} />
                    <span style={{
                      borderBottom: '0.05em solid solid rgba(55,53,47,.25)',
                      fontWeight: 500,
                      flexShrink: 0
                    }}>렛츠커리어 매니저 레오</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
} 