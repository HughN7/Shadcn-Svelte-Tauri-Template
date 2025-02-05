//credit of inspiration to: https://github.com/clearlysid/tauri-plugin-decorum/blob/main/src/commands.rs

use tauri;

#[tauri::command]
pub async fn show_snap_overlay() -> Result<(), String> {
    #[cfg(target_os = "windows")]
    {
        use enigo::{
            Direction::{Press, Release},
            Enigo, Key, Keyboard, Settings,
        };
        
        // Create Enigo instance
        let mut enigo = Enigo::new(&Settings::default()).map_err(|e| e.to_string())?;

        // Simulate pressing the Windows + Z Key.
        enigo.key(Key::Meta, Press).map_err(|e| e.to_string())?;
        enigo.key(Key::Z, Press).map_err(|e| e.to_string())?;
        enigo.key(Key::Z, Release).map_err(|e| e.to_string())?;
        enigo.key(Key::Meta, Release).map_err(|e| e.to_string())?;

        // Wait 50 ms
        std::thread::sleep(std::time::Duration::from_millis(50));

        // Press Alt to hide the ugly numbers
        enigo.key(Key::Alt, Press).map_err(|e| e.to_string())?;
        enigo.key(Key::Alt, Release).map_err(|e| e.to_string())?;
    }

    Ok(())
}
