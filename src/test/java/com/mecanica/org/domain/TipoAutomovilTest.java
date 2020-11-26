package com.mecanica.org.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mecanica.org.web.rest.TestUtil;

public class TipoAutomovilTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TipoAutomovil.class);
        TipoAutomovil tipoAutomovil1 = new TipoAutomovil();
        tipoAutomovil1.setId(1L);
        TipoAutomovil tipoAutomovil2 = new TipoAutomovil();
        tipoAutomovil2.setId(tipoAutomovil1.getId());
        assertThat(tipoAutomovil1).isEqualTo(tipoAutomovil2);
        tipoAutomovil2.setId(2L);
        assertThat(tipoAutomovil1).isNotEqualTo(tipoAutomovil2);
        tipoAutomovil1.setId(null);
        assertThat(tipoAutomovil1).isNotEqualTo(tipoAutomovil2);
    }
}
