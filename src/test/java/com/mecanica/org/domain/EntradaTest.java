package com.mecanica.org.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mecanica.org.web.rest.TestUtil;

public class EntradaTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Entrada.class);
        Entrada entrada1 = new Entrada();
        entrada1.setId(1L);
        Entrada entrada2 = new Entrada();
        entrada2.setId(entrada1.getId());
        assertThat(entrada1).isEqualTo(entrada2);
        entrada2.setId(2L);
        assertThat(entrada1).isNotEqualTo(entrada2);
        entrada1.setId(null);
        assertThat(entrada1).isNotEqualTo(entrada2);
    }
}
