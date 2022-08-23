use termion::event::Key;
use termion::input::TermRead;
use termion::raw::IntoRawMode;

use std::io::{stdin, stdout, Write};
use std::usize;

#[derive(Copy, Clone, PartialEq, Debug)]
enum Piece {
    Empty,
    X,
    O,
}

fn blue(str: &str) -> String {
    format!("\x1b[34m{str}\x1b[0m")
}

const EMPTY: &str = "\x1b[48;5;240m   \x1b[0m";

struct Game {
    board: [Piece; 16],
    cursor: usize,
    width: usize,
    height: usize,
    quit: bool,
}

impl Game {
    fn new() -> Game {
        Game {
            board: [Piece::Empty; 16],
            cursor: 0,
            width: 10,
            height: 10,
            quit: false,
        }
    }

    fn update_board(&mut self) {
        let cursor = self.cursor;
        loop {
            match stdin().keys().next().unwrap().unwrap() {
                Key::Esc => {
                    // TODO autosave
                    self.quit = true;
                    break;
                }
                Key::Left => {
                    if cursor % 4 == 0 {
                        self.cursor += 4 - 1
                    } else {
                        self.cursor -= 1
                    }
                    break;
                }
                Key::Right => {
                    if cursor % 3 == 2 {
                        self.cursor -= 2
                    } else {
                        self.cursor += 1
                    }
                    break;
                }
                Key::Up => {
                    if cursor < 3 {
                        self.cursor += 6
                    } else {
                        self.cursor -= 3
                    }
                    break;
                }
                Key::Down => {
                    if cursor > 5 {
                        self.cursor -= 6
                    } else {
                        self.cursor += 3
                    }
                    break;
                }
                Key::Char(' ') => {
                    // TODO interact
                    if self.board[cursor] == Piece::Empty {
                        break;
                    }
                }
                _ => (),
            }
        }
    }

    fn draw_board(&self) {
        let cursor = "\x1b[48;5;240m\x1b[39m[ ]\x1b[0m";
        let o = &blue(" O ");
        let x = &blue(" X ");
        let mut pieces: Vec<&str> = self
            .board
            .iter()
            .map(|x| match *x {
                Piece::Empty => EMPTY,
                Piece::O => "O",
                Piece::X => "X",
            })
            .collect();
        pieces[self.cursor] = match pieces[self.cursor] {
            EMPTY => cursor,
            "O" => o,
            "X" => x,
            _ => " ",
        };

        print!("{}{}", termion::clear::All, termion::cursor::Goto(1, 1));
        print!("─ Minesweeper ─ Menu>\r\n\r");
        print!(
            "\r\n\x1b[48;5;241m   \x1b[0m\x1b[48;5;242m   \x1b[0m\x1b[48;5;243m   \x1b[0m\x1b[0m\x1b[48;5;244m   \x1b[0m\x1b[0m\x1b[48;5;245m   \x1b[0m\r\n\r\n"
        );
        print!("{}{}{}{}\r\n", pieces[0], pieces[1], pieces[2], pieces[3]);
        print!("{}{}{}{}\r\n", pieces[4], pieces[5], pieces[6], pieces[7]);
        print!("{}{}{}{}\r\n", pieces[8], pieces[9], pieces[10], pieces[11]);
        print!(
            "{}{}{}{}\r\n",
            pieces[12], pieces[13], pieces[14], pieces[15]
        );
    }
}

fn main() {
    let mut stdout = stdout().into_raw_mode().unwrap();
    write!(stdout, "{}", termion::cursor::Hide).unwrap();
    let mut game = Game::new();
    loop {
        game.draw_board();
        game.update_board();
        if game.quit {
            break;
        }
    }
    write!(stdout, "{}", termion::cursor::Show).unwrap();
}
