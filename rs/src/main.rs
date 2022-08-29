use termion::event::Key;
use termion::input::TermRead;
use termion::raw::IntoRawMode;

use colored::*;

use std::io::{stdin, stdout, Write};
use std::usize;

// const MINE: u8 = 9;
const FLAG: u8 = 10;
const OPEN: u8 = 20;

struct Minesweeper {
    board: [u8; 81],
    cursor: usize,
    width: usize,
    height: usize,
    pause: bool,
}

impl Minesweeper {
    fn new() -> Minesweeper {
        Minesweeper {
            board: [1; 81],
            cursor: 0,
            width: 9,
            height: 9,
            pause: false,
        }
    }

    fn control(&mut self) {
        // let cursor = self.cursor;
        loop {
            match stdin().keys().next().unwrap().unwrap() {
                Key::Esc => {
                    // TODO menu
                    self.pause = true;
                    break;
                }
                Key::Char('a') => {
                    if self.cursor % self.width == 0 {
                        self.cursor += self.width - 1
                    } else {
                        self.cursor -= 1
                    }
                    break;
                }
                Key::Char('d') => {
                    if (self.cursor + 1) % self.width == 0 {
                        self.cursor -= self.width - 1
                    } else {
                        self.cursor += 1
                    }
                    break;
                }
                Key::Char('w') => {
                    if self.cursor < self.width {
                        self.cursor += self.width * (self.height - 1)
                    } else {
                        self.cursor -= self.width
                    }
                    break;
                }
                Key::Char('s') => {
                    if self.cursor >= self.width * (self.height - 1) {
                        self.cursor -= self.width * (self.height - 1)
                    } else {
                        self.cursor += self.width
                    }
                    break;
                }
                Key::Char('j') => {
                    // TODO interact
                    if self.board[self.cursor] < FLAG {
                        self.board[self.cursor] += OPEN;
                    }
                    break;
                }
                Key::Char('k') => {
                    // TODO interact
                    if self.board[self.cursor] < FLAG {
                        self.board[self.cursor] += FLAG; // flag
                    } else if self.board[self.cursor] < OPEN {
                        self.board[self.cursor] -= FLAG; // unflag
                    }
                    break;
                }
                _ => (),
            }
        }
    }

    fn draw(&self) {
        let mut frame = String::new();
        for i in 0..self.board.len() {
            let mut left = " ";
            let mut right = " ";
            let mut mid = " ";
            let mut end = "";

            if i != 0 && (i + 1) % self.width == 0 {
                end = "\r\n";
            }

            if i == self.cursor {
                left = "<";
                right = ">";
            }

            if OPEN < self.board[i] {
                mid = match self.board[i] % 10 {
                    1 => "1",
                    2 => "2",
                    3 => "3",
                    4 => "4",
                    5 => "5",
                    6 => "6",
                    7 => "7",
                    8 => "8",
                    9 => "#",
                    _ => " "
                };
            } 

            // flagged cell
            if FLAG <= self.board[i] && self.board[i] < OPEN {
                mid = "F";
            }

            let mut cell = format!(
                "{}{}{}{}",
                left.on_truecolor(128, 128, 128),
                mid.truecolor(0, 0, 0)
                    .on_truecolor(128, 128, 128)
                    .bold(),
                right.on_truecolor(128, 128, 128),
                end
            );

            if OPEN <= self.board[i] {
                cell = format!(
                    "{}{}{}{}",
                    left.on_truecolor(255, 255, 255),
                    mid.truecolor(0, 0, 0)
                        .on_truecolor(255, 255, 255)
                        .bold(),
                    right.on_truecolor(255, 255, 255),
                    end
                );
            }

            frame += &cell;
        }
        print!(
            "{}{}<Minesweeper>\r\n{}\r\n",
            termion::clear::All,
            termion::cursor::Goto(1, 1),
            frame
        );
    }
}

fn main() {
    let mut stdout = stdout().into_raw_mode().unwrap();
    write!(stdout, "{}", termion::cursor::Hide).unwrap();
    let mut game = Minesweeper::new();
    loop {
        game.draw();
        game.control();
        if game.pause {
            break;
        }
    }
    write!(stdout, "{}", termion::cursor::Show).unwrap();
}
