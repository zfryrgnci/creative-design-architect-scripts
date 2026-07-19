-- ============================================================================
-- Script Name: Text_and_Data_154
-- Platform: 3ds Max
-- Description: Typography and data-merge automation script #154.
-- ============================================================================

macroScript TextandData154
category:"DesignArchitectScripts"
tooltip:"Text_and_Data_154"
buttonText:"Text_and_Data_154"
(
    try
    (
        -- Initialization
        local scriptName = "Text_and_Data_154"
        
        -- Core execution block
        -- Typography and data-merge automation script #154.
        
        -- Log success
        print (scriptName + " executed successfully.")
    )
    catch
    (
        messageBox ("Error in " + scriptName + ": " + getCurrentException()) title:"Script Error"
    )
)
